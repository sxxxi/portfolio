'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import CenterStage from "@/app/components/centerStage/CenterStage";

export default function Login() {
  const [uname, setUname] = useState('');
  const [pass, setPass] = useState('');
  const { push, back } = useRouter();

  function onLoginRequest() {
    if (!(uname && pass)) {return}

    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: uname,
        password: pass
      })
    }).then(res => 
      res.json()
    ).then(data => {
      sessionStorage.setItem('sxxxi-token', data.token);
      push('/admin/create');
    })
  }

  return <>
    <CenterStage>
        <h2>Login</h2>
        <input placeholder="Username" type="text" value={uname} onChange={e => setUname(e.currentTarget.value)}/>
        <input placeholder="Password" type="password" value={pass} onChange={e => setPass(e.currentTarget.value)}/>
        <input type="button" value={'Login'} onClick={onLoginRequest} />
    </CenterStage>
  </>
}