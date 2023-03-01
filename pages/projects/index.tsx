import Layout from "@/components/layout";
import { ReactElement } from "react";

const API_TOKEN = "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";
export async function getServerSideProps() {
  let data = await fetch("https://api.github.com/users/sxxxi/repos", {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${API_TOKEN}`,
    }
  }).then(res => res.json());
  return {
    props: {
      repos: data
    }
  }
}

type Project = {
  id: number,
  name: string,
  html_url: string,
  description: string,
  created_at: string,
  updated_at: string,
  language: string
}

type ProjectsProps = {
  repos: Array<Project>
}

export default function Projects({repos}: ProjectsProps) {
  return (
    <>
      <div>
        {repos.map((p: Project) => <ProjectCard key={p.id} project={p}/>)}
      </div>
    </>
  );
}

Projects.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

type ProjectCardProps = {
  project: Project
}
function ProjectCard({project}: ProjectCardProps) {
  return (
    <div className="flex flex-col bg-emerald-100 rounded-md m-4 p-6">
      <h1 className="text-xl font-bold"><a href={project.html_url} target={'_blank'} rel={'noreferrer'}>{project.name}</a></h1>
      <p>{project.description}</p>
      <div className="flex flex-row text-xs">
        <span>{project.created_at}</span>
        <span>{project.updated_at}</span>
      </div>
    </div>
  );
}