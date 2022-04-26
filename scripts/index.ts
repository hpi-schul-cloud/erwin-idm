import KeycloakAdminClient from "@keycloak/keycloak-admin-client";

async function main(): Promise<void> {
    const client = new KeycloakAdminClient({
        baseUrl: "http://localhost:8080",
        realmName: "master"
    })

    await client.auth({
        username: "admin",
        password: "admin",
        grantType: "password",
        clientId: "admin-cli"
    })

    const users = await client.users.find()

    if (users.some(user => user.username === "foobar")) {
        const user = users.find(user => user.username === "foobar")
        await client.users.del({
            id: user!.id!,
            realm: "master"
        })
    }

    await client.users.create({
        realm: "master",
        username: "foobar",
        enabled: true,
        credentials: [
            {
                id: "2290c820-b333-4cba-9689-10fde72a1c1a",
                type: "password",
                createdDate: 1650965026515,
                secretData: "{\"value\":\"$2y$08$2SPpSTafh.oMhMP.39RSluAom0D1DDSPfg8H5D86WLV/nfOvADk2K\",\"salt\":\"\",\"additionalParameters\":{}}",
                credentialData: "{\"hashIterations\":8,\"algorithm\":\"bcrypt\",\"additionalParameters\":{}}"
            },
            // {
            //     id: "2290c820-b222-4cba-9689-10fde72a1c1a",
            //     type: "password",
            //     createdDate: 1650965878325,
            //     secretData: "{\"value\":\"GIj0tIr6txREjkGrVt0voKZMiV9EeOxJBCT+z0EvOKYNGcr5bUUIwrx8EW4h3fdxqfxZfbvqNZE5WPxkNrS35g==\",\"salt\":\"iS5aA4T3T51ByBD8nkVHIw==\",\"additionalParameters\":{}}",
            //     credentialData: "{\"hashIterations\":27500,\"algorithm\":\"pbkdf2-sha256\",\"additionalParameters\":{}}"
            // }
        ]
    })
}

main()
    .then(_ => console.log("\nDone"))
    .catch(_ => console.log("\nSomething went wrong"))
