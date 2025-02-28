import { Container, Typography, Paper } from "@mui/material";

export default function PrivacyPolicy() {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>RODO - Przetwarzanie Danych Osobowych</Typography>
                <Typography paragraph>
                    Twoja prywatność jest dla nas ważna. Niniejsza polityka wyjaśnia, jak gromadzimy, wykorzystujemy i chronimy Twoje dane osobowe.
                </Typography>

                <Typography variant="h5" gutterBottom>Jakie dane zbieramy?</Typography>
                <Typography paragraph>
                    Możemy gromadzić dane osobowe, takie jak imię, adres e-mail oraz inne informacje podane przez Ciebie.
                </Typography>

                <Typography variant="h5" gutterBottom>W jaki sposób wykorzystujemy Twoje dane?</Typography>
                <Typography paragraph>
                    Twoje dane są wykorzystywane do świadczenia i ulepszania naszych usług, komunikacji z Tobą oraz zapewnienia bezpieczeństwa.
                </Typography>

                <Typography variant="h5" gutterBottom>Ochrona danych</Typography>
                <Typography paragraph>
                    Wdrażamy odpowiednie środki bezpieczeństwa w celu ochrony Twoich danych przed nieautoryzowanym dostępem.
                </Typography>

                <Typography variant="h5" gutterBottom>Twoje prawa</Typography>
                <Typography paragraph>
                    Masz prawo do dostępu, aktualizacji i usunięcia swoich danych osobowych. Skontaktuj się z nami w celu realizacji tych praw.
                </Typography>

                <Typography variant="h5" gutterBottom>Zmiany w polityce RODO</Typography>
                <Typography paragraph>
                    Możemy okresowo aktualizować niniejszą politykę. Wszelkie zmiany zostaną opublikowane na tej stronie.
                </Typography>

                <Typography mt={4}>
                    Jeśli masz jakiekolwiek pytania, skontaktuj się z nami.
                </Typography>
            </Paper>
        </Container>
    );
}