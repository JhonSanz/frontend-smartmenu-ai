import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export default function DashboardCard({
  cardSx,
  title,
  content
}) {
  return (
    <Card sx={cardSx}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="#757575">
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {content}
        </Typography>
      </CardContent>
    </Card>
  )
}