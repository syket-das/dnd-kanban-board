import { Flex, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import useColumnTasks from '../hooks/useColumnTasks';
const TaskScreen = () => {
  const navigate = useNavigate();
  const { id, column } = useParams();
  const [task, setTask] = React.useState<any>(null);
  const [input, setInput] = React.useState('');
  const {
    tasks,
    addEmptyTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
    updateTask,
  } = useColumnTasks(column);

  useEffect(() => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTask(task);
      setInput(task.title);
    }

    console.log('task', id);
  }, [id, tasks]);

  console.log('tasks', tasks);

  if (tasks.length === 0) {
    return <h1>No tasks found</h1>;
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    updateTask(task.id, { ...task, title: newTitle });
    navigate('/');
  };

  const handleDeleteClick = () => {
    deleteTask(task.id);
    navigate('/');
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      h="80vh"
      w="100%"
      fontSize="3xl"
    >
      <div className="">
        <h1>Task Details</h1>
        <textarea
          style={{
            width: '100%',
            height: '100px',
            padding: '10px',
            fontSize: '20px',
            border: '1px solid #ccc',
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Stack marginTop={10} direction="row" spacing={4} align="center">
          <Button
            onClick={() => updateTask(task.id, { ...task, title: input })}
            colorScheme="teal"
            variant="solid"
          >
            Update
          </Button>
          <Button
            onClick={() => handleDeleteClick()}
            colorScheme="red"
            variant="outline"
          >
            Delete
          </Button>
        </Stack>
      </div>
    </Flex>
  );
};

export default TaskScreen;
