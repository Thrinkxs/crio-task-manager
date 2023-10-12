import React, { useRef, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  ChakraProvider,
} from "@chakra-ui/react";
import { Backdrop, Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AiOutlinePlus, AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import useUserData from "../hooks/useUserData";
import { Axios } from "../Axios";
import WeatherComponent from "../components/WeatherComponent";

const Users = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { userData, setUserData } = useUserData();
  const Users = userData;
  const getRowId = (user) => user._id;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: null,
    username: "",
  });
  const [editMode, setEditMode] = useState(false);
  const dataGridRef = useRef<DataGrid>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      width: 300,
    },
    { field: "username", headerName: "User", width: 300 },
    {
      field: "Actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <div className="flex gap-8">
            <AiFillEdit
              className="text-lg cursor-pointer"
              onClick={() => handleEdit(params.row)}
            />
            <AiOutlineDelete
              className="text-lg cursor-pointer"
              onClick={() => handleDelete(params.row)}
            />
          </div>
        </>
      ),
    },
  ];

  const handleEdit = (params) => {
    setEditMode(true);

    setFormData({
      _id: params._id,
      username: params.username,
    });
    onOpen();
    if (dataGridRef.current) {
      dataGridRef.current.clearSelection();
    }
  };

  const handleDelete = async (params) => {
    try {
      const response = await Axios.delete(`/api/users/delete/${params._id}`);

      if (response.status === 200) {
        const updatedUsers = userData.filter((user) => user._id !== params._id);
        setUserData(updatedUsers);
        if (dataGridRef.current) {
          dataGridRef.current.clearSelection();
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("/api/users/create", formData);
      if (!response) {
        throw new Error("Network response was not ok");
      } else if (response.status === 201) {
        setSuccess(true);
        setOpen(true);
        onClose();
        setEditMode(false);
        setFormData({
          _id: null,
          username: "",
        });
        if (dataGridRef.current) {
          dataGridRef.current.clearSelection();
        }
        const data = await response.data;
        setUserData(data.users);
        localStorage.setItem("userData", JSON.stringify(data.users));
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await Axios.patch(`/api/users/update/${formData._id}`, {
        username: formData.username,
      });

      if (!response) {
        throw new Error("Network response was not ok");
      } else if (response.status === 200) {
        setSuccess(true);
        setOpen(true);
        onClose();
        if (dataGridRef.current) {
          dataGridRef.current.clearSelection();
        }
        setEditMode(false);
        const data = await response.data;
        setUserData(data.users);
        localStorage.setItem("userData", JSON.stringify(data.users));
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="flex py-8 justify-center gap-96  items-center">
        <WeatherComponent />
        <h1 className="text-4xl font-bold">Users</h1>
        <ChakraProvider>
          <Button
            onClick={onOpen}
            className="flex justify-center items-center gap-5 bg-lime"
          >
            Create User <AiOutlinePlus className="text-fav1 bg-lime rounded" />{" "}
          </Button>
        </ChakraProvider>
      </div>
      <div style={{ height: 500, width: "900px", padding: "20px" }}>
        {!Users ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            style={{ visibility: Users ? "visible" : "hidden" }}
          />
        ) : (
          <DataGrid
            rows={userData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            getRowId={getRowId}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
            ref={dataGridRef}
          />
        )}
      </div>
      <ChakraProvider>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {editMode ? " Edit user" : "Create new user"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              {editMode ? (
                <Button colorScheme="blue" mr={3} onClick={handleUpdateUser}>
                  Update
                </Button>
              ) : (
                <Button colorScheme="blue" mr={3} onClick={handleCreateUser}>
                  Save
                </Button>
              )}
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
      {success && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
          // onClick={() => console.log(formData)}
        >
          <h1>{editMode ? "User Updated" : "User Created"} Successfully</h1>
        </Backdrop>
      )}
    </>
  );
};

export default Users;
