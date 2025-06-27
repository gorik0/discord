import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        // Create a test profile (if doesn't already exist)
        const profile = await prisma.profile.upsert({
            where: { userId: "test-user-123" },
            update: {},
            create: {
                userId: "test-user-123",
                email: "test@example.com",
                name: "Test User",
                imageURL: "https://example.com/avatar.png",
            },
        });

        console.log("Test Profile:", profile);

        // Query profiles
        const allProfiles = await prisma.profile.findMany();
        console.log("All Profiles:", allProfiles);
    } catch (error) {
        console.error("🔥 Prisma Test Failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();