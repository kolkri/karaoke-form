import './KaraokeForm.css'
import { useForm, Controller } from 'react-hook-form'
import { KaraokeSongs } from '../constants/KaraokeSongs'

const KaraokeForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (formData: any) => {
    console.log('formdata', formData)
  }

  return (
    <div className='Karaoke'>
      <h1>Ilmoittautumislomake</h1>
      <form className='KaraokeForm' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>Nimi tai nimimerkki*</label>
        <Controller
          rules={{
            required: true,
          }}
          name='name'
          control={control}
          render={({ field }) => <input id='name' type='text' {...field} />}
        />
        <label htmlFor='song'>Biisi*</label>
        <Controller
          rules={{
            required: true,
          }}
          name='song'
          control={control}
          render={({ field }) => (
            <select id='song' {...field}>
              <option value=''>-- Valitse biisi --</option>
              {KaraokeSongs.map(song => (
                <option key={song.id} value={song.id}>
                  {song.name} - {song.artist}
                </option>
              ))}
            </select>
          )}
        />
        <label>Sävellaji*</label>
        <Controller
          name='key'
          control={control}
          render={({ field }) => (
            <div>
              <input type='radio' {...field} value='-2' id='-2' />
              <label htmlFor='-2'>-2</label>
              <input type='radio' {...field} value='-1' id='-1' />
              <label htmlFor='-1'>-1</label>
              <input type='radio' {...field} value='0' id='0' />
              <label htmlFor='0'>0</label>
              <input type='radio' {...field} value='+1' id='+1' />
              <label htmlFor='+1'>+1</label>
              <input type='radio' {...field} value='+2' id='+2' />
              <label htmlFor='+2'>+2</label>
            </div>
          )}
        />
        <Controller
          name='consent'
          control={control}
          render={({ field }) => (
            <label>
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
