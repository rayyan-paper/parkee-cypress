describe('One Piece API Validation', () => {

    const API_URL = 'https://api.api-onepiece.com/v2/characters/en';

    // helper: convert bounty string → number
    const parseBounty = (bounty) => {
        if (!bounty) return 0;

        const cleaned = bounty.replace(/\./g, '').replace(/,/g, '');
        const num = Number(cleaned);

        return isNaN(num) ? 0 : num;
    };

    it('should validate all business rules', () => {
        cy.request(API_URL).then((response) => {

            // 1. Status code
            expect(response.status, 'Status code must be 200').to.eq(200);

            const data = response.body;

            // 2. Unique character IDs
            const ids = data.map(c => c.id);
            const uniqueIds = new Set(ids);

            expect(
                uniqueIds.size,
                'Character IDs must be unique'
            ).to.eq(ids.length);

            // 3. Gum-Gum Fruit validation
            data.forEach((char) => {
                if (char.fruit && char.fruit.name === 'Gum-Gum Fruit') {
                    expect(
                        char.name,
                        'Gum-Gum Fruit must belong only to Monkey D Luffy'
                    ).to.eq('Monkey D Luffy');
                }
            });

            // 4. total_prime validation per crew
            const crewMap = {};

            data.forEach((char) => {
                if (!char.crew) return;

                const crewId = char.crew.id;

                if (!crewMap[crewId]) {
                    const totalPrimeParsed = parseBounty(char.crew.total_prime);

                    crewMap[crewId] = {
                        total_prime: totalPrimeParsed,
                        sum: 0
                    };
                }

                crewMap[crewId].sum += parseBounty(char.bounty);
            });

            Object.entries(crewMap).forEach(([crewId, crew]) => {

                // skip apabila total_prime invalid (optional improvement)
                if (crew.total_prime === 0) {
                    cy.log(`Skipping crew ${crewId} due to invalid total_prime`);
                    return;
                }

                expect(
                    crew.sum,
                    `Mismatch in crew ${crewId}: total bounty != total_prime`
                ).to.eq(crew.total_prime);
            });

        });
    });

});