"use client"
import JwtService from "@/app/service/jwt.service";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import ProjectPack from "@/pages/api/projects/project-pack.model";
import CenterStage from "@/app/components/centerStage/CenterStage";


export default function ProjectCreatePage() {
  const {push} = useRouter()
  const [formData, setFormData] = useState(new FormData())
  const [image, setImage] = useState<File>()
  const [project, setProject] = useState<ProjectPack>(
    {
      title: "",
      description: "",
      images: []
    }
  );

  useEffect(() => {
    JwtService.getToken(() => {push('/auth/login')})
  }, [])


  const onImageSelect = (event: FormEvent<HTMLInputElement>) => {
    const newImage = event.currentTarget.files?.[0]
    if (newImage != null) {
      setImage(newImage)
    }
    console.log("Uploaded: ", newImage)
  }

  const uploadImage = () => { 
    if (image) {
      formData.delete('avatar')
      formData.append('avatar   ', image)
    }
    
    fetch("/api/projects/add", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('sxxxi-token')}`,
      },
      body: formData
    }).then(res => {
      console.log(res);
      if (res.status == 200) {
        push('/')
      }
    });
  }

  const updateProject = (event: FormEvent<HTMLInputElement>) => {
    setProject({
      ...project,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    formData.set(event.currentTarget.name, event.currentTarget.value)
  }

  return <>
    <CenterStage>
      <h2>New Project</h2>
      <input placeholder="Title" type="text" name="title" value={project.title} onChange={updateProject} />
      <input placeholder="Description" type="text" name="description" value={project.description} onChange={updateProject} />
      <input placeholder="Images" type="file" name="avatar" onChange={onImageSelect} />
      <input type="submit" title="Submit" onClick={uploadImage}/>
    </CenterStage>
  </>
}