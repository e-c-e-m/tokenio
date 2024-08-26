import SyncIcon from '@mui/icons-material/Sync';
import { purple } from '@mui/material/colors';

export default function Loading() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-0 p-3 bg-main">
      <SyncIcon className="animate-spin" sx={{ color: purple[500] }} fontSize="medium" />
    </main>
  );
}
