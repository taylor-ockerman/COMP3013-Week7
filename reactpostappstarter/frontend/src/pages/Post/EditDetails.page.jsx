import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

function EditDetailsPage() {
  const navigate = useNavigate();
  const data = useLoaderData().result;
  //console.log(data);
  const form = useForm({
    initialValues: {
      id: data.post.id,
      userId: data.post.userId,
      title: data.post.title,
      category: data.post.category,
      image: data.post.image,
      content: data.post.content,
    },
  });

  const handleSubmit = async (values) => {
    // console.log(values);
    // console.log(data.post.id)
    const res = await axios.post(`${DOMAIN}/api/posts/:id/edit`, values);
    if (res?.data.success) {
      navigate(`/posts/${data.post.id}`);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <input hidden readOnly type="text" name="id" value={data.post.id}></input>
        <input hidden readOnly type="text" name="userId" value={data.post.id}></input>
        <TextInput
          label="Title"
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image" 
          {...form.getInputProps("image")}
        />
        <TextInput
          label="Content"
          {...form.getInputProps("content")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
}

export const editDetailsLoader = async ({ params }) => {
  //console.log(params.id);
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id -1}`);
  console.log("Details loader ran!");
  return res.data;
};

export default EditDetailsPage;
