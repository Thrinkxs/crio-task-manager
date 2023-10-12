import React, { useRef, useState } from "react";
import {
  DataGrid,
  GridRowParams,
  GridRowsProp,
  GridColDef,
} from "@mui/x-data-grid";
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
  Select,
} from "@chakra-ui/react";
import { Backdrop, Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AiOutlinePlus, AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import { Axios } from "../Axios";
import useTaskData from "../hooks/useTaskData";
import useUserData from "../hooks/useUserData";
const Tasks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { taskData, setTaskData } = useTaskData();
  const { userData, setUserData } = useUserData();
  const Tasks = taskData;
  const Users = userData;
  const getRowId = (task) => task._id;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    description: "",
    assignee: "",
    status: "",
    category: "",
  });
  const [editMode, setEditMode] = useState(false);
  const dataGridRef = useRef<DataGrid>(null);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    { field: "description", headerName: "Description", width: 300 },
    { field: "assignee", headerName: "Assignee", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "category", headerName: "Category", width: 300 },
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
      name: params.name,
      description: params.description,
      assignee: params.assignee,
      status: params.status,
      category: params.category,
    });
    onOpen();
    if (dataGridRef.current) {
      dataGridRef.current.clearSelection();
    }
  };

  const handleDelete = async (params) => {
    try {
      const response = await Axios.delete(`/api/tasks/delete/${params._id}`);

      if (response.status === 200) {
        const updatedTasks = taskData.filter((task) => task._id !== params._id);
        setTaskData(updatedTasks);
        if (dataGridRef.current) {
          dataGridRef.current.clearSelection();
        }
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("/api/tasks/create", formData);
      if (!response) {
        throw new Error("Network response was not ok");
      } else if (response.status === 201) {
        setSuccess(true);
        setOpen(true);
        onClose();
        setEditMode(false);
        setFormData({
          _id: null,
          name: "",
          description: "",
          assignee: "",
          status: "",
          category: "",
        });
        if (dataGridRef.current) {
          dataGridRef.current.clearSelection();
        }
        const data = await response.data;
        setTaskData(data.tasks);
        localStorage.setItem("taskData", JSON.stringify(data.tasks));
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await Axios.patch(`/api/tasks/update/${formData._id}`, {
        name: formData.name,
        description: formData.description,
        assignee: formData.assignee,
        status: formData.status,
        category: formData.category,
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
        setTaskData(data.task);
        localStorage.setItem("taskData", JSON.stringify(data.tasks));
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <div className="flex py-8 justify-center gap-96  items-center">
        <h1 className="text-4xl font-bold">Tasks</h1>
        <ChakraProvider>
          <Button
            onClick={onOpen}
            className="flex justify-center items-center gap-5 bg-lime"
          >
            Create Task <AiOutlinePlus className="text-fav1 bg-lime rounded" />{" "}
          </Button>
        </ChakraProvider>
      </div>
      <div style={{ height: 500, width: "1700px", padding: "20px" }}>
        {!Tasks ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            style={{ visibility: Tasks ? "visible" : "hidden" }}
          />
        ) : (
          <DataGrid
            rows={taskData}
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
              {editMode ? " Edit task" : "Create new task"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Assignee</FormLabel>
                <Select
                  placeholder="Select option"
                  name="assignee"
                  onChange={handleInputChange}
                  value={formData.assignee}
                >
                  {Users.map((user) => (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </Select>
                {/* <Input
                  ref={initialRef}
                  placeholder="assignee"
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleInputChange}
                /> */}
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  onChange={handleInputChange}
                  value={formData.status}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Completed</option>
                </Select>
                {/* <Input
                  ref={initialRef}
                  placeholder="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                /> */}
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Category"
                  name="category"
                  value={formData.category}
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
                <Button colorScheme="blue" mr={3} onClick={handleCreateTask}>
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
          <h1>{editMode ? "Task Updated" : "Task Created"} Successfully</h1>
        </Backdrop>
      )}
    </>
  );
};

export default Tasks;
