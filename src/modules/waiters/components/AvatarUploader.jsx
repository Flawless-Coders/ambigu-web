import { Avatar, IconButton, Box } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function AvatarUploader({ avatar, setAvatar, setFieldValue }) {
  const handleAvatarChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      setFieldValue("avatar", file);
    }
  };

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Avatar src={avatar} sx={{ width: 120, height: 120 }} />
      <IconButton
        color="primary"
        component="label"
        sx={{
          position: "absolute",
          bottom: 5,
          right: 5,
          backgroundColor: "background.paper",
          boxShadow: 2,
        }}
      >
        <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
        <PhotoCamera />
      </IconButton>
    </Box>
  );
}