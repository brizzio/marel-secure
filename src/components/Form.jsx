import React from 'react'
import * as openpgp from 'openpgp';

const Form = () => {
    const [form, setForm]=React.useState({})
    const [message, setMessage]=React.useState('')

    const change = (data) => {
        const update = {...form, ...data}
        setForm(update)
    }

    const publicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nxsFNBGQimqQBEACUQ+RdOpwuXTTyHxAs/MMB7VrmsmqPyk7h3jaJq9xaDTto+TNU\nw4cjjUuIatLVclcMzBbCnjpLbDvFbFVnKxZTAxUvwSxGSZ/onFVe/ttBO30JWTaf\nDd6tNhwaROTbe1wrqUv9+fW4FA/tC5qnayBa0/pYGePuvEdJwnhiq2uqo3aw4YNU\nCD9ErzNN33x1td9byIjPPdBTB19ATp5uB1KeYITIbKa+fwclXxiIsT7JeuI0m3GA\nlD5dvo/a3IBfFXo1likMAiMPKpjPSJzv6gYnthzIs72zT/bS8t8pqnr5sJOQi1Eg\nuN5JnPOf+QwsR1V7DVvfRZ9YrL7oFygIAdfCLD5HoW1PF90k3jR5FToWAWUASoOf\nD3/Zn21jrSozfry81+2tE+Eg/y6Pwuas2TVD0MX5GO3LK4ItHFCbKUT/v95DJzAC\neY12NRS+e0NW1gqbPNoBSZU+bPqTN5K7XjIANHNqh7FNVNTz1yLePhl4I1oPlWNv\nBF7TgNb4URP4+d4skiGGWuEeEBQWrlzWR45/lbfvVpw4lNtHJ1S8Rs88URpg+0bB\nhwqSlbMpC82Tyaz7hA1DHq8kP+1rq1pHASqQrkdhNFZRMsZbxlX9PZ6MttaQsmkZ\naVn3VxYlWJJ9Qqs9yymVxMTPbrZK6vQSfQkshdmLxewc18gxY00erGRFzQARAQAB\nzQswMjQ2MzY0MDMwNsLBigQTAQgANAUCZCKaqwIbDgQLCQgHBRUICQoLBRYCAwEA\nAh4BFiEEKuo15OTvK49XazLSzDEU6wYB5HsACgkQzDEU6wYB5HsI1g/9EQ8pnT6M\nxTKzzoxjfkHrISYs1g6p827b4szDJ48vi3rG6rYCRsYx06Z5MavZnOqMJ4lxV5/d\nWuJBFN1PFYvSHSgUf9i5x/R+Mj39gJJDSeQwEkFQecxX8OsfCTiirzBqhc8rGW2G\nw+HYlDoDXXL0hTtqIoX9HieOW122N05a8BQk7Z7/lL3KqyZvFjABIxp2ShX0xv9g\ntujtak7HIP4yqVQIrBpYRvv0eUL0txCsnA/Vx7/RLx3kVR7lGy2MWyaigWjimudf\ntM0TcsTeSHGBtyIxbKJ1Ybh0RnLGO2PKroSc2yjhu2MlcbJMwBSUs652jpPI9Eh+\nm5ZWrL2pS3RrcAzq2D3ev+KW5lhsMZHyvledFh37A6vGKbll9lxy5ODiYcJvBX0k\nhnbvpfWZCbbR+SIpyAr3jbL4iHGrHR25SbqKrI3QPRE9GtzEF7dDUKfRZM9BV2Ks\nxECwIhWjFRX7hLQB/Sc+cGTsSyu/AZifZsHt4gbX39zdsb2MTmWq2KE1syl3vVMj\nZ9mrx6V6fKwz/KbrBawuI2uV8slgEk5cwLYtDSZHEpTBltvSq0jjma1ejr+id7Bx\njgVGvzYwM1wNktfVKvqrViOdNACTJjTB0PGUuR3GiPp+wQLMcyB66K1VLl5P20V4\nSmk28D/vlfJJLd7bBaSHZukD9oQRvHXc8h0=\n=fYWY\n-----END PGP PUBLIC KEY BLOCK-----`

    const publicKeyReaded = async () => {
        const t = (await openpgp.readKey({ armoredKey: publicKey })).getKeys()[0]
        return t;
    };

    const crypto = async () => {
        openpgp.config.preferredAEADAlgorithm = openpgp.enums.aead.ocb
        const mex = await openpgp.createMessage({ text: JSON.stringify(form)})
        const results = await openpgp.encrypt({
            message: mex, // input as Message object
            encryptionKeys: await publicKeyReaded(),
        })
        console.log(mex)
        console.log(results)
        setMessage(results)
    };



    const Instructions = ()=>{
        return (
            <div className='flex flex-col items-center  w-4/6 h-full gap-6 mt-[2rem]'>
                <div className='card'>
                    Hai gia le credenziali del sistema Entratel( ADE), caso contrario accessa il sito della ADE 
                    <a href='https://iampe.agenziaentrate.gov.it/sam/UI/Login?realm=/agenziaentrate'> qui</a>.
                    <span className= 'absolute -top-2 -left-2 rounded-full bg-black text-white px-2 font-semibold'>1</span>
                </div>
                <div className='card'>
                    Riempi i nostro form con i dati richiesti
                    <span className= 'absolute -top-2 -left-2 rounded-full bg-black text-white px-2 font-semibold'>2</span>
                </div>
                <div className='card'>
                    Clicca su CODIFICA CREDENZIALI per creare una chiave crittografata per accedere il sistema ENTRATEL di forma telematica con totale sicurezza ( i tuoi dati sono accessati solamente dalla ADE e nessun altro ha come farlo perche la chiave di decriptazione del messagio é nei server della ADE ).
                    <span className= 'absolute -top-2 -left-2 rounded-full bg-black text-white px-2 font-semibold'>3</span>
                </div>
            </div>
        )
    }

    if(message) return (
        <div className='flex flex-col justify-center items-center w-full h-full py-6 rounded-xl shadow-xl gap-3 '>
            <h1 className=' text-2xl font-semibold text-sky-900  text-center w-3/6'>Le credenziali sono state crittografate con successo. Il sistema marel usera solamente questa chiave per inviare gli scontrini alla ADE. Solamente la ADE é in possesso della chiave privata per decriptare il messagio cifrato con queste informazioni.  </h1>
            <h3 className=' text-lg font-thin  text-center w-3/6'>{message}</h3>
            <h1 className=' text-2xl font-semibold text-sky-900  text-center w-3/6'>Puoi chiudere questa pagina. I sistemi sono a posto per fare le trasmissioni telematiche alla ADE   </h1>
        </div>
    )

    return (

        <div className='flex flex-row items-center w-full h-full py-6 rounded-xl shadow-xl '>

            <Instructions/>

            <div className='flex flex-col justify-center items-center w-4/12 h-auto py-6 rounded-xl shadow-xl'>
                    <h1 className=' text-4xl font-thin text-teal-600 w-5/6'>crittografare le tue credenziali</h1>

                <div className='fields'>

                    <div className='label-input-group'>
                        <label 
                        className="label">partita iva
                        </label>
                        <input 
                        className='input' 
                        placeholder='piva'
                        onChange={(e)=>change({piva:e.target.value})}/>
                    </div>

                    <div className='label-input-group'>
                        <label 
                        className="label">Utente
                        </label>
                        <input 
                        className='input' 
                        placeholder='username' 
                        onChange={(e)=>change({username:e.target.value})}/>
                    </div>
                    <div className='label-input-group'>
                        <label 
                        className="label">pin
                        </label>
                        <input 
                        className='input' 
                        placeholder='pin'
                        onChange={(e)=>change({pin:e.target.value})}/>
                    </div>
                    <div className='label-input-group'>
                        <label 
                        className="label">password
                        </label>
                        <input 
                        className='input' 
                        placeholder='password'
                        onChange={(e)=>change({password:e.target.value})}/>
                    </div>
                    <div className='label-input-group'>
                        <label 
                        className="label">password
                        </label>
                        <input 
                        className='input' 
                        placeholder='passwordIniziale'
                        onChange={(e)=>change({passwordIniziale:e.target.value})}/>
                    </div>
                    <div className='label-input-group'>
                        <label 
                        className="label">Utenza
                        </label>
                        <select 
                        className='input'
                        onChange={(e)=>change({utenza:e.target.value})}>
                            <option value={null}></option>
                            <option value={'mestesso'}>Me Stesso</option>
                            <option value={'incarichi'}>Incaricato</option>
                        </select>
                    </div>
                
            
                </div>
                <button 
                className='btn-primary m-auto p-6 uppercase'
                onClick={crypto}>Codifica Credenziali</button>
                
                
                </div>




        </div>


    
  )
}

export default Form