import './KaraokeForm.css'
import { useForm, Controller } from 'react-hook-form'
import { KaraokeSongs } from '../constants/KaraokeSongs'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import Loader from './Loader'

const KaraokeForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [step, setStep] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [song, setSong] = useState<string>('')
  const [key, setKey] = useState<string>('')

  const onSubmit = (formData: any) => {
    setLoading(true)
    console.log('formdata', formData)
    setName(formData.name)
    setSong(formData.song)
    setKey(formData.key)
    setTimeout(() => {
      setLoading(false)
      setStep(1)
    }, 3000)
  }

  const handleFileUpload = (acceptedFiles: any) => {
    setUploadedFiles(acceptedFiles)
  }

  const handleNewSong = () => {
    reset()
    setUploadedFiles([])
    setStep(0)
  }

  return (
    <>
      {step === 0 && (
        <div className='Karaoke'>
          <h3>Ilmoittautumislomake</h3>
          <form className='KaraokeForm' onSubmit={handleSubmit(onSubmit)}>
            <label className='labelStyle' htmlFor='name'>
              Nimi tai nimimerkki*
            </label>
            <Controller
              rules={{
                required: true,
              }}
              name='name'
              control={control}
              render={({ field }) => (
                <>
                  <input id='name' type='text' {...field} />
                  {errors.name && <span className='error'>Nimi on pakollinen</span>}
                </>
              )}
            />
            <label className='labelStyle'>Kasvokuva</label>
            <Dropzone onDrop={handleFileUpload}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className='dropzone'>
                  <input {...getInputProps()} />
                  {uploadedFiles.length > 0 ? (
                    <img src={URL.createObjectURL(uploadedFiles[0])} alt='Uploaded' className='uploaded-image' />
                  ) : (
                    <p>+ Tuo kasvokuva</p>
                  )}
                </div>
              )}
            </Dropzone>
            <label htmlFor='song' className='labelStyle'>
              Biisi*
            </label>
            <Controller
              rules={{
                required: true,
              }}
              name='song'
              control={control}
              render={({ field }) => (
                <>
                  <select id='song' {...field}>
                    <option className='labelStyle' value=''>
                      -- Valitse biisi --
                    </option>
                    {KaraokeSongs.map(song => (
                      <option key={song.id} value={song.id}>
                        {song.name} - {song.artist}
                      </option>
                    ))}
                  </select>
                  {errors.song && <span className='error'>Biisi on pakollinen</span>}
                </>
              )}
            />
            <label className='labelStyle'>Sävellaji*</label>
            <Controller
              name='key'
              rules={{
                required: true,
              }}
              control={control}
              render={({ field }) => (
                <>
                  <div>
                    <input type='radio' {...field} value='-2' id='-2' />
                    <label htmlFor='-2' className='radio-label'>
                      -2
                    </label>
                    <input type='radio' {...field} value='-1' id='-1' />
                    <label htmlFor='-1' className='radio-label'>
                      -1
                    </label>
                    <input type='radio' {...field} value='0' id='0' />
                    <label htmlFor='0' className='radio-label'>
                      0
                    </label>
                    <input type='radio' {...field} value='+1' id='+1' />
                    <label htmlFor='+1' className='radio-label'>
                      +1
                    </label>
                    <input type='radio' {...field} value='+2' id='+2' />
                    <label htmlFor='+2' className='radio-label'>
                      +2
                    </label>
                  </div>

                  {errors.key && <span className='error'>Sävellaji on pakollinen</span>}
                </>
              )}
            />
            <Controller
              name='consent'
              control={control}
              render={({ field }) => (
                <div className='checkboxDiv'>
                  <input type='checkbox' {...field} id='consent' />
                  <p>Sallin tietojeni tallennuksen järjestelmään</p>
                </div>
              )}
            />
            <button type='submit' aria-label='ilmoittaudu' disabled={loading}>
              {loading ? <Loader /> : 'Ilmoittaudu'}
            </button>
          </form>
        </div>
      )}
      {step === 1 && (
        <div className='result'>
          <h3>Seuraavana vuorossa:</h3>
          {uploadedFiles.length > 0 && <img src={URL.createObjectURL(uploadedFiles[0])} alt='Uploaded' className='profile-image' />}
          <p>{name}</p>
          <p>
            {KaraokeSongs.find(item => item.id === Number(song))?.name} - {KaraokeSongs.find(item => item.id === Number(song))?.artist}{' '}
          </p>
          <p>Sävellaji: {key}</p>
          <button onClick={handleNewSong} aria-label='uusi biisi'>
            Uusi biisi
          </button>
        </div>
      )}
    </>
  )
}

export default KaraokeForm
