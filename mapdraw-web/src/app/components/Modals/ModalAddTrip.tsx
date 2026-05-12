import {
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Stack,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";

import { StyledModal } from "./StyledModal";

import usePostTrip from "@/app/hooks/usePostTrip";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  vehicle: string;
};

type AddTripProps = {
  openModal: boolean;
  setOpenModal: (bool: boolean) => void;
};

export default function ModalAddTrip(props: AddTripProps) {
  const { data, loading, error, postTrip } = usePostTrip();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const trip = {
      id: 0,
      name: data.name,
      vehicle: data.name,
      userId: 0,
    };

    const value = postTrip(trip);
  };
  const handleClose = () => {
    props.setOpenModal(false);
  };

  //console.log(watch("name")); // watch input value by passing the name of it

  return (
    <StyledModal open={props.openModal} onClose={handleClose}>
      <div>
        <Typography variant="h5" component="h2" fontWeight={700}>
          Create New
        </Typography>
      </div>

      <Stack
        component="form"
        spacing={3}
        sx={{ mt: 3 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Trip Name"
          variant="outlined"
          defaultValue="test"
          fullWidth
          sx={{
            input: {
              fontWeight: "bold",
            },
          }}
          {...register("name")}
        />

        <FormControl fullWidth>
          <InputLabel id="vehicle-label">Vehicle</InputLabel>

          <Select
            labelId="vehicle-label"
            label="Vehicle"
            defaultValue=""
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

          {errors.vehicle && (
            <FormHelperText error>This field is required</FormHelperText>
          )}
        </FormControl>

        <Button variant="outlined" type="submit">
          Go
        </Button>
      </Stack>
    </StyledModal>
  );
}
