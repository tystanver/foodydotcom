"use client"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import EditOrderModal from "./EditOrderModal";

const ITEM_HEIGHT = 48;

export default function ActionModal({ instance }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
     
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "26ch",
            borderRadius: "20px",
          },
        }}
      >
        <div className="p-6 ">       
          <div className="flex items-center cursor-pointer" >
            <DriveFileRenameOutlineIcon className="text-[#569cdd]" />
            <EditOrderModal instance={instance} />
          </div>
          <div className="flex items-center">
            <DeleteForeverIcon />
            {/* <DeleteProduct instance={instance} /> */}
          </div>
        </div>
      </Menu>
    </div>
  );
}
