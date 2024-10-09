// src/app/prispevok/[prispevokId]/page.tsx
import Typography from '@mui/material/Typography';
export const metadata = {title: "Detail príspevku | Zoska"}
export default function PostDetail({
  params, 
}: {
  params: {prispevokId: string};
}) {
  
  return (
      
      <Typography> Detail konkrétneho prispevku {params.prispevokId}  </Typography>
      
  );
}
