import './KaraokeForm.css'
import { useForm, Controller } from 'react-hook-form'
import { KaraokeSongs } from '../constants/KaraokeSongs'
import { useState } from 'react'
import Dropzone from 'react-dropzone'

const KaraokeForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [uploadedFiles, setUploadedFiles] = useState([])

  const onSubmit = (formData: any) => {
    console.log('formdata', formData)
  }

  const handleFileUpload = (acceptedFiles: any) => {
    setUploadedFiles(acceptedFiles)
  }

  return (
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
            <label className='checkboxText'>
              <input type='checkbox' {...field} />
              Sallin tietojeni tallennuksen karaokejärjestelmään
            </label>
          )}
        />
        <button type='submit' aria-label='ilmoittaudu'>
          Ilmoittaudu
        </button>
      </form>
    </div>
  )
}

export default KaraokeForm
