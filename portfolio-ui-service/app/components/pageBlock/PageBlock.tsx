import { Center, Container } from "@chakra-ui/react"

interface PageBlockProps {
  children?: React.ReactNode,
  height?: string,
  padding?: string,
  maxWidth?: string,
  className?: string,
  bgSrc?: string,
  bgSize?: string,
}

export default function PageBlock({height, children, padding, maxWidth, className, bgSrc, bgSize}: PageBlockProps) {
  return <>
    <Center className={`pageBlockContainer ${className}`} 
      h={height} padding={padding} 
      bgImg={bgSrc} bgRepeat={'no-repeat'} bgSize={bgSize || 'cover'}>
      
      <Container className={className} w={'100%'} maxW={maxWidth}>
        {children}
      </Container>
      
    </Center>
  </>
}