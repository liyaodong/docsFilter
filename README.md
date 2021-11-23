# Simple too to download doc/docx docs from url.txt and generate report for each docs file

## Run

```
# install packages
yarn

# parse url from urls.txt and download files
node parseUrl.js

# generate report for each word file, generate count
node checkFilValid.js

# generate invalid report
node filterInvalid.js
```

## To remind

- Download files can cause massive requests to target server, use npm package `sleep` if necessary.
