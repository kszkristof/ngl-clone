# ngl.link clone

This is just a quick & dirty clone of the site [ngl.link](https://ngl.link). It may not be as pretty, but it's much more private and quicker as well. 
The base idea is that you generate a site for yourself, and anyone with your ID can send you anonymous messages.
You can self-host this as well pretty easily.

# Running

You'll need to generate a database secret at ./secrets/mongo_root_password.txt (see the docker-compose docs as well as the project's docker-compose.yml file). You can for example do so by running `openssl -rand -out ./secrets/mongo_root_password.txt 64`.

Then, just run `docker-compose up -d` to start. 
