import { StickyHeaderLayout } from '@/components/PageLayouts'
import Link from 'next/link';
import { ReactNode } from 'react';
import { supabase } from './lib/supabaseClient';

/**
 * NOTE TO SELF: a type cannot be re-opened to add new properties vs an interface which is always extendable
 * I use Supabase's database free hosting just so it gets easier for me to add entries to my portfolio 
 * without having to restart my Vercel deployment. Still have lots of plans for this bad boy.
 */
export async function getServerSideProps() {
  let skills = (await supabase.from('skills').select()).data;
  let education = (await supabase.from('education').select()).data;
  let projects = (await supabase.from('projects').select()).data;

  return {
    props: {
      skills: skills,
      education: education,
      projects: projects
    }
  }
}

// Type declarations
type SkillsByArea = {
  skill_area: string,
  skill_list: string[]
}

type EduInstitution = {
  name: string,
  course: string,
  link: string,
  start_date: Date,
  end_date: string,
}

type Project = {
  title: string;
  description: string;
  link: string;
  tech: string[];
};

interface HomeProps {
  skills: SkillsByArea[],
  education: EduInstitution[]
  projects: Project[],
}
export default function Home({ skills, education, projects }: HomeProps) {
  return (
    <>
      <StickyHeaderLayout title={"Seiji Akakabe"}>
        <SkillsSection skills={skills} />
        <EducationSection institutions={education}/>
        <ProjectsSection projects={projects} />
      </StickyHeaderLayout>
    </>
  );
}

interface WordBeansProps {
  words: string[]
}
const WordBeans = ({ words }: WordBeansProps) => {
  return (
    <div className='flex flex-row flex-wrap'>
      {words.map((w, index) => 
        <span key={index} className=' m-1 p-1 rounded-md text-sm bg-slate-200 drop-shadow-md'>{w}</span>
      )}
    </div>
  );
}

interface LabeledChildrenProps {
  title: string,
  children: ReactNode
}
const PageSection = ({ title, children }: LabeledChildrenProps) => {
  return (
    <section>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <div className='p-4 bg-slate-50 rounded-md space-y-4'>{children}</div>
    </section>
  );
}

const LabeledContent = ({ title, children }: LabeledChildrenProps) => {
  return (
    <div className={"bg-white rounded-md relative drop-shadow-md p-4"}>
      <h2 className='font-semibold text-xl'>{title}</h2>
      <div>{children}</div>
    </div>
  );
}



type SkillsSectionProps = {
  skills: SkillsByArea[]
}
const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <PageSection title={'Skills'}>
      {skills.map((area, areaIdx) => 
        <LabeledContent title={area.skill_area} key={areaIdx}>
          <WordBeans words={area.skill_list} />
        </LabeledContent>
      )}
    </PageSection>
  );
}


enum MonthList {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

interface EducationSectionProps {
  institutions: EduInstitution[]
}
const EducationSection = ( { institutions }: EducationSectionProps) => {
  return (
    <PageSection title={"Education"}>
      {institutions.map((i, idx) => {
        const startDate = new Date(i.start_date);
        const endDate = new Date(i.end_date);

        return <LabeledContent key={idx} title={i.name}>
          <div className="flex flex-row justify-between">
            <span>{i.course}</span>
            <span>
              {startDate.getFullYear()} ~ {endDate.getFullYear()}
            </span>
          </div>
        </LabeledContent>
      })}
    </PageSection>
  );
}



type ProjectsSectionProps = {
  projects: Project[]
}
export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <PageSection title={"Projects"}>
      {projects.map((p, i) => {
        return(
          <div key={i} className=" bg-white rounded-md relative drop-shadow-md hover:bg-slate-300 transition-colors duration-75">
            <Link href={p.link} className="absolute w-full h-full" target='_blank'></Link> 
            <div className='p-4 flex flex-col'>
              <span className="text-xl font-semibold">{p.title}</span>
              <span>{p.description}</span>
              <WordBeans words={p.tech} />
            </div>
          </div>
        );
      })}
    </PageSection>
  );
};

























