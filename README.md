# HB back-end

This is a project for the HackerBay.io Round 1 [interview task](https://github.com/hackerbay/interview-backend-task). It carries out three basic functions;
- Authentication; this returns a signed JWT
- JSON Patch; this applies a patch to a JSON document and returns it
- Image Resize (Thumbnail); this resizes an image to 50x50 pixels and returns it

## Usage
To run this project, first you need to clone this repository `git clone https://github.com/IkechukwuAKalu/hb-backend.git` or download the zipped project

Next, you need to run `npm i` to download all the dependencies

Then run `npm start` to start the project

Additionally, you can run `npm test` to run the tests included in the project.

**NOTE:** Your server has to be running for the `integration tests` to complete. Also, it is recommended to have an internet connection when running the `test.image_thumbnail.js` integration test in order to enable it download the image for resize.

### Docker
The public image for this project on Docker Hub is http://hub.docker.com/aikaykalz/hb-backend.
To pull the repository,

`docker pull aikaykalz/hb-backend`

You can run the image for your terminal using the following command

`docker run --rm -p 3000:3000 aikaykalz/hb-backend`

**NOTE:** If you encounter permission errors, you should consider running the command with `sudo`.

## Routes
This project has just three routes (one public route and two protected routes) and are as follows:
- `POST http://localhost:3000/login` for the login function. This also signs a JSON Web Token for use in the other two routes.
- `PATCH http://localhost:3000/apply-patch` for the JSON Patch function. This applies performs the patch operaion with the data provided in the object.
- `GET http://localhost:3000/gen-thumbnail` for the image thumbnail function. This downloads a public image, resizes it (to 50x50 pixels) and returns it

**NOTE:** Depending on your configuration, you may need to change the host and/or the port number in the URL.