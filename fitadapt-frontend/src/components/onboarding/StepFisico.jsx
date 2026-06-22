import { useState } from 'react';

export default function StepFisico({ onNext }) {
  const [form, setForm] = useState({
    edad: '',
    peso: '',
    altura: '',
    nivelActividad: 'PRINCIPIANTE',
    objetivo: 'SALUD_GENERAL',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onNext({
      edad: Number(form.edad),
      peso: Number(form.peso),
      altura: Number(form.altura),
      nivelActividad: form.nivelActividad,
      objetivo: form.objetivo,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">
          Datos físicos
        </h2>
        <p className="text-sm text-gray-500">
          Paso 1 de 2
        </p>
      </div>

      <input
        type="number"
        name="edad"
        placeholder="Edad"
        value={form.edad}
        onChange={handleChange}
        required
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="peso"
        placeholder="Peso (kg)"
        value={form.peso}
        onChange={handleChange}
        required
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="altura"
        placeholder="Altura (cm)"
        value={form.altura}
        onChange={handleChange}
        required
        className="w-full border rounded-lg p-3"
      />

      <select
        name="nivelActividad"
        value={form.nivelActividad}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="PRINCIPIANTE">Principiante</option>
        <option value="INTERMEDIO">Intermedio</option>
        <option value="AVANZADO">Avanzado</option>
      </select>

      <select
        name="objetivo"
        value={form.objetivo}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="SALUD_GENERAL">Salud General</option>
        <option value="PERDER_PESO">Perder Peso</option>
        <option value="GANAR_MUSCULO">Ganar Músculo</option>
        <option value="RESISTENCIA">Resistencia</option>
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg"
      >
        Continuar →
      </button>
    </form>
  );
}