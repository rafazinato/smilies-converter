import React, { useState, useEffect, useRef } from "react";
import SmileDrawerContainer from "./SmilesContainer";
import { Link } from "react-router-dom";
import Arquivo from "./assets/Pasta1.csv";
import * as Papa from "papaparse";
import Chart from 'chart.js/auto';
import './App.css'

function arange(start, stop, step = 1) {
  let result = [];
  for (let i = start; i < stop; i += step) {
      result.push(i);
  }
  return result;
}

export default function Page1(props) {
  const [data, setData] = useState([]); // Estado para armazenar os dados do arquivo
  const [smile, setSmile] = useState('')
  const [pka,setPka] = useState('')
  const [ph, setPh] = useState([])
  // const ph = [0.000, 0.047, 0.093, 0.140, 0.187, 0.233, 0.280, 0.327, 0.373, 0.420, 0.467, 0.513, 0.560, 0.607, 0.653, 0.700, 0.747, 0.793, 0.840, 0.887, 0.933, 0.980, 1.027, 1.073, 1.120, 1.167, 1.213, 1.260, 1.307, 1.353, 1.400, 1.447, 1.493, 1.540, 1.587, 1.633, 1.680, 1.727, 1.773, 1.820, 1.867, 1.913, 1.960, 2.007, 2.053, 2.100, 2.147, 2.193, 2.240, 2.287, 2.333, 2.380, 2.427, 2.473, 2.520, 2.567, 2.613, 2.660, 2.707, 2.753, 2.800, 2.847, 2.893, 2.940, 2.987, 3.033, 3.080, 3.127, 3.173, 3.220, 3.267, 3.313, 3.360, 3.407, 3.453, 3.500, 3.547, 3.593, 3.640, 3.687, 3.733, 3.780, 3.827, 3.873, 3.920, 3.967, 4.013, 4.060, 4.107, 4.153, 4.200, 4.247, 4.293, 4.340, 4.387, 4.433, 4.480, 4.527, 4.573, 4.620, 4.667, 4.713, 4.760, 4.807, 4.853, 4.900, 4.947, 4.993, 5.040, 5.087, 5.133, 5.180, 5.227, 5.273, 5.320, 5.367, 5.413, 5.460, 5.507, 5.553, 5.600, 5.647, 5.693, 5.740, 5.787, 5.833, 5.880, 5.927, 5.973, 6.020, 6.067, 6.113, 6.160, 6.207, 6.253, 6.300, 6.347, 6.393, 6.440, 6.487, 6.533, 6.580, 6.627, 6.673, 6.720, 6.767, 6.813, 6.860, 6.907, 6.953, 7.000, 7.047, 7.093, 7.140, 7.187, 7.233, 7.280, 7.327, 7.373, 7.420, 7.467, 7.513, 7.560, 7.607, 7.653, 7.700, 7.747, 7.793, 7.840, 7.887, 7.933, 7.980, 8.027, 8.073, 8.120, 8.167, 8.213, 8.260, 8.307, 8.353, 8.400, 8.447, 8.493, 8.540, 8.587, 8.633, 8.680, 8.727, 8.773, 8.820, 8.867, 8.913, 8.960, 9.007, 9.053, 9.100, 9.147, 9.193, 9.240, 9.287, 9.333, 9.380, 9.427, 9.473, 9.520, 9.567, 9.613, 9.660, 9.707, 9.753, 9.800, 9.847, 9.893, 9.940, 9.987, 10.033, 10.080, 10.127, 10.173, 10.220, 10.267, 10.313, 10.360, 10.407, 10.453, 10.500, 10.547, 10.593, 10.640, 10.687, 10.733, 10.780, 10.827, 10.873, 10.920, 10.967, 11.013, 11.060, 11.107, 11.153, 11.200, 11.247, 11.293, 11.340, 11.387, 11.433, 11.480, 11.527, 11.573, 11.620, 11.667, 11.713, 11.760, 11.807, 11.853, 11.900, 11.947, 11.993, 12.040, 12.087, 12.133, 12.180, 12.227, 12.273, 12.320, 12.367, 12.413, 12.460, 12.507, 12.553, 12.600, 12.647, 12.693, 12.740, 12.787, 12.833, 12.880, 12.927, 12.973, 13.020, 13.067, 13.113, 13.160, 13.207, 13.253, 13.300, 13.347, 13.393, 13.440, 13.487, 13.533, 13.580, 13.627, 13.673, 13.720, 13.767, 13.813, 13.860, 13.907, 13.953,14.000]
  const [alfa, setAlfa] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Ref para armazenar a instância do gráfico
  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(Arquivo, {
        download: true,
        delimiter: ";",
        header: true,
        complete: (result) => {
          const parsedData = result.data;
          setData(parsedData); // Armazena os dados no estado
        },
      });
    };

    fetchParseData();
  }, []); // Chama o efeito apenas uma vez quando o componente monta

  const listName = data.map((compounds, index) => <option id={compounds.index}>{compounds.name}</option>)

  function handleId(i) {
    let idx = data.findIndex((item) => item.name == i);

    setSmile(data[idx].smile);
    setPka([data[idx].pka1,data[idx].pka2,data[idx].pka3]) // colocar o némuero maximo

    let tpka = [Number(data[idx].pka1),Number(data[idx].pka2),Number(data[idx].pka3)];
    let tph = arange(Math.floor(Math.min(...tpka) - 3), Math.ceil(Math.max(...tpka) + 3), .05);

    setPh(tph);

    function calcAlpha(ph, pka) {
      let alpha = [];
  
      let denominator = 1;
      pka.forEach((element, idx) => {
          denominator += element ? 10 ** ((idx+1) * ph - pka.slice(0, idx + 1).reduce((acc, curr) => acc + curr, 0)) : 0;
      });
  
      // alpha 0
      alpha.push(1 / denominator);
  
      // other alphas
      pka.forEach((element, idx) => {
        if (element) alpha.push(alpha[0] * 10 ** ((idx+1) * ph - pka.slice(0, idx + 1).reduce((acc, curr) => acc + curr, 0)))
      });
  
      return alpha;
  }
  
  
    let alpha = tph.map(ph => calcAlpha(ph, tpka))
    
    let a0 = alpha.map(a => a[0])
    let a1 = alpha.map(a => a[1])
    let a2 = alpha.map(a => a[2])
    let a3 = alpha.map(a => a[3])

    setAlfa([a0, a1, a2, a3])
  }

  // Criando o gráfico

  // Efeito para criar ou atualizar o gráfico sempre que 'text' for atualizado
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroi o gráfico anterior antes de criar o novo
    }

    const ctx = chartRef.current.getContext('2d');
    
    // Cria o novo gráfico de linha
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line', // Tipo de gráfico
      data: {
        labels: ph,
        datasets: [
          {
            label: 'Alfa 0',
            data: alfa[0],
            backgroundColor: 'rgba(3, 119, 252, 0.2)',
            borderColor: 'rgba(3, 119, 252, 1)',
            borderWidth: 2,
            fill: false,
          },{
            label: 'Alfa 1',
            data: alfa[1],
            backgroundColor: 'rgba(252, 177, 3, 0.2)',
            borderColor: 'rgba(252, 177, 3, 1)',
            borderWidth: 2,
            fill: false,
          },{
            label: 'Alfa 2',
            data: alfa[2],
            backgroundColor: 'rgba(11, 158, 45, 0.2)',
            borderColor: 'rgba(11, 158, 45, 1)',
            borderWidth: 2,
            fill: false,
          },{
            label: 'Alfa 3',
            data: alfa[3],
            backgroundColor: 'rgba(219, 18, 18, 0.2)',
            borderColor: 'rgba(219, 18, 18, 1)',
            borderWidth: 2,
            fill: false,
          }
        ]
      },
      options: {
        elements: {
          point: {
            radius: 0,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Gráfico de Seleção de Compostos',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  }, [alfa, ph]); // O efeito será disparado toda vez que o 'text' mudar


  //criando a tabela 
  function maketable() {
    let listpka = [1, pka[0], pka[1], pka[2]];
    listpka = listpka.filter(pka => pka !== ""); 
  
    return (
      <>
        <table>
          <tr>
            <th>Carga máxima</th>
            <th>PKA1</th>
            {pka[1] !== '' && <th>PKA2</th>}  {/* Verifica se pka2 não está vazio */}
          
            {pka[2] !== '' && <th>PKA3</th>}  {/* Verifica se pka3 não está vazio */}
          </tr>
          <tr>
            {listpka.map((pka, index) => (<th key={index}>{pka}</th>))} {/* Lembre-se da key no map */}
          </tr>
        </table>
      </>
    );
  }
  
  return (
    <>
      <SmileDrawerContainer smilesStr={smile} />
      {maketable()}
      <form>
      <select   id='select' defaultValue={'ccc'} onChange={(e) => handleId(e.target.value)}>
      {listName}
      </select>
      </form>
      <div  class='graph'>
        <canvas  ref={chartRef} width={7} height={3} />
      </div>
      

    </>
  );
}
