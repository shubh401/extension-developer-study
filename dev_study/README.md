## _I have no idea how to make it safer_: Studying Security and Privacy Mindsets of Browser Extension Developers

### Prototype E-Commerce Application Deployment

We outline the set of steps required to deploy the e-commerce Web application located in the `dev_study` directory using Docker Compose. We used this _protoype_ application, as is, to enable our study participants to work on browser extensions-related coding tasks during the interview.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system.
- [Docker Compose](https://docs.docker.com/compose/install/) (v2 or later).

### Directory Structure

The `dev_study` directory contains:

- `docker-compose.yml` – Docker Compose configuration for the application stack.
- `apps/app1/` – Django application source code and Dockerfile.
- `nginx/` – Nginx reverse proxy configuration and Dockerfile.
- `cert/` – SSL certificates for HTTPS.
- Other supporting files and directories.

### Deployment Steps

1. **Navigate to the `dev_study` directory:**

    ```sh
    cd dev_study
    ```

    ```sh
    pwd
    ./extension-developer-study/dev_study
    ```

2. **Build and start the containers:**

    ```sh
    docker compose --build up -d
    ```

    - The `--build` flag ensures images are rebuilt from the latest source.
    - The `-d` flag runs containers in detached mode.

3. **Access the Application:**
    - By default, the application will be available at [https://localhost:9000](https://localhost:9000) or [https://127.0.0.1:9000](https://127.0.0.1:9000).
    - If you are running on a remote server, replace `localhost` with your server's IP or domain. Additionally, you will aslo need to forward the remote port (9000) to your local machine.
    - The default credentials to log into the applications are: **Username**: ``foo``, **Password**: ``bar``.

4. **Stopping the Application:**

    To stop the running containers:

    ```sh
    docker compose down
    ```

### Notes

- The application uses HTTPS by default, with self-signed certificates located in the `cert/` directory.
- The Django app runs with Gunicorn as the WSGI server.
- Nginx acts as a reverse proxy in front of the Django app.
- Static files are served by Nginx.

### Troubleshooting

- If you encounter permission issues, try running Docker commands with `sudo`.
- For logs, use:

    ```sh
    docker compose logs
    ```

- To rebuild containers after code changes, rerun:

    ```sh
    docker compose --build up -d
    ```

For questions or issues, please create an issue or contact us at: shubham.agarwal@cispa.de.

---