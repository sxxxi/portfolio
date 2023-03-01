import { Inter } from '@next/font/google'
import { StickyHeaderLayout } from '@/components/PageLayouts'
import Link from 'next/link';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] })
const programmingLanguages = ['Kotlin', 'Java', 'C/C#', 'Rust', 'Javascript/Typescript'];
const webtech = ['React', 'NextJS', 'HTML/CSS', 'MySQL', 'ExpressJS', 'Spring Boot' ];
const systems= ['Data Structures', 'Algorithmic thinking', 'Software Design Patterns', 'UNIX Processes'];
const other = ['Android', 'Unity'];

const projects = [
  {
    title: "sushi-place-api",
    description: "My attempt at utilizing ExpressJS and Typescript to create a simple restaurant order system.",
    link: "https://github.com/sxxxi/sushi-place-api",
  },
];

export default function Home() {
  return (
    <>
      <StickyHeaderLayout title={"Seiji Akakabe"}>
        <PageSection title={"Skills"}>
          <div className="flex flex-row justify-between space-y-2 flex-wrap">
            <LabeledContent title={"Programming Languages"}>
              <WordBeans words={programmingLanguages} />
            </LabeledContent>

            <LabeledContent title={"Web Technologies"}>
              <WordBeans words={webtech} />
            </LabeledContent>

            <LabeledContent title={"Systems"}>
              <WordBeans words={systems} />
            </LabeledContent>

            <LabeledContent title={"Other"}>
              <WordBeans words={other} />
            </LabeledContent>
          </div>
        </PageSection>

        <PageSection title={"Education"}>
          <div className="flex flex-col bg-slate-100 p-4 rounded-md border-dotted border">
            <div className="text-xl grow">Sheridan College</div>
            <div className="flex flex-row text-xs grow justify-between">
              <span>Software Development and Network Engineering</span>
              <span></span>
              <span>2020 ~ 2023</span>
            </div>
          </div>
        </PageSection>
        
        <PageSection title={'Projects'}>
          <ProjectCards projects={projects}/>
        </PageSection>
      </StickyHeaderLayout>
    </>
  );
}


type WordBeansProps = {
  words: string[]
}
const WordBeans = ({ words }: WordBeansProps) => {
  return (
    <div className='flex flex-row flex-wrap'>
      {words.map((w, index) => 
        <span key={index} className=' m-1 p-1 rounded-md text-sm bg-slate-200'>{w}</span>
      )}
    </div>
  );
}

type LabeledChildrenProps = {
  title: string,
  children: ReactNode
}
const PageSection = ({ title, children }: LabeledChildrenProps) => {
  return (
    <section>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <div className='p-4 space-y-4 bg-slate-50 rounded-md'>{children}</div>
    </section>
  );
}

const LabeledContent = ({ title, children }: LabeledChildrenProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

const ProjectCard = ({ href, title, description }: any) => {
  return (
    <Link href={href} className=' bg-pink-100 rounded-md pt-12'>
      <div className='flex flex-col bg-white p-4 rounded-b-md'>
        <span className='text-xl font-semibold'>{title}</span>
        <span>{description}</span>
      </div>
    </Link>
  );
}

type Project = {
  title: string,
  description: string,
  link: string
}
type ProjectCardsProps = {
  projects: Project[]
}
const ProjectCards = ({ projects }: ProjectCardsProps) => {
  return (
    <div>
      {projects.map((p, i) => {
        return(
          <Link key={i} href={p.link} className=" bg-pink-100 rounded-md pt-12">
            <div className="flex flex-col bg-white p-4 rounded-b-md">
              <span className="text-xl font-semibold">{p.title}</span>
              <span>{p.description}</span>
            </div>
          </Link>
        );
      })}
    
    </div>
  );
};
