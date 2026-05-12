import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Trash2 } from "lucide-react";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  vehicle: string;
};

type AddTripProps = {
  openModal: boolean;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddTrip(props: AddTripProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("name")); // watch input value by passing the name of it

  return (
    <>
      <Modal
        open={props.openModal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Trip Name"
              variant="outlined"
              defaultValue="test"
              {...register("name")}
            />
            <Select
              label="Vehicle Type"
              {...register("vehicle", { required: true })}
            >
              <MenuItem value={1}>90s sports bike</MenuItem>
              <MenuItem value={2}>Honda 90</MenuItem>
              <MenuItem value={3}>Inline skates</MenuItem>
              <MenuItem value={4}>Bike</MenuItem>
              <MenuItem value={5}>Skateboard</MenuItem>
              <MenuItem value={6}>Kite Pulled Snowboard/Long Board</MenuItem>
              <MenuItem value={7}>Paramotor</MenuItem>
              <MenuItem value={8}>Kayak</MenuItem>
              <MenuItem value={9}>Jet Ski</MenuItem>
              <MenuItem value={10}>Foil</MenuItem>
              <MenuItem value={11}>Catamaran</MenuItem>
              <MenuItem value={12}>Ski</MenuItem>
              <MenuItem value={13}>Snowmobile</MenuItem>
              <MenuItem value={14}>Hot air balloon</MenuItem>
              <MenuItem value={15}>Unicycle</MenuItem>
              <MenuItem value={16}>k11 nissan micra</MenuItem>
              <MenuItem value={17}>mx5</MenuItem>
            </Select>

            {/* include validation with required or other standard HTML validation rules */}
            <input />
            {/* errors will return when field validation fails  */}
            {errors.vehicle && <span>This field is required</span>}

            {/* <Button variant="contained">Cancel</Button> */}
            <Button variant="outlined" type="submit">
              Create New
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
