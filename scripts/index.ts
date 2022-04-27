import KeycloakAdminClient from "@keycloak/keycloak-admin-client";

async function main(): Promise<void> {
    const client = new KeycloakAdminClient({
        baseUrl: "http://localhost:8080",
        realmName: "master"
    });

    await client.auth({
        username: "admin",
        password: "admin",
        grantType: "password",
        clientId: "admin-cli"
    });

    const users = await client.users.find();

    if (users.some(user => user.username === "superhero")) {
        const user = users.find(user => user.username === "superhero");
        await client.users.del({
            id: user!.id!,
            realm: "master"
        });
    }

    await client.users.create({
        realm: "master",
        username: "superhero",
        email: "superhero@schul-cloud.org",
        enabled: true,
        credentials: [
            {
                id: "2290c820-b333-4cba-9689-10fde72a1c1a",
                type: "password",
                createdDate: 1650965026515,
                secretData: "{\"value\":\"$2a$10$wMuk7hpjULOEJrTW/CKtU.lIETKa.nEs8fncqLJ74SMeX.fzJXBla\",\"salt\":\"\",\"additionalParameters\":{}}",
                credentialData: "{\"hashIterations\":10,\"algorithm\":\"bcrypt\",\"additionalParameters\":{}}"
            }
        ]
    })
}

main()
    .then(_ => console.log("\nDone"))
    .catch(_ => console.log("\nSomething went wrong"));
