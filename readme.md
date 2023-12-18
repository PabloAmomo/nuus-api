# Nuus API
Simple Node.js API to read the news feed for Nuus.

# Functions
Send **x-user** with the user identification in the request header.

## GET
- **/feeds** -> To get all feeds pending read.
- **/feeds/:id** -> To get :id feed.

## POST
- **/feeds/readed** -> To set as readed multiples feeds.
- **/feeds/readed/:id** -> To set :id feed as readed.

