import { Button } from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react';
import { ProvaContext } from '../context/ProvaContext';
import transformaNumero from '../functions/auxiliares';

export default function AlternativaRevisao(props) {
  const { respostasSelecionadas, pontuacao, setPontuacao } = useContext(ProvaContext);
  const [pontuacaoAtualizada, setPontuacaoAtualizada] = useState(false); 

  const alternativaLetra = transformaNumero(props.index);

  function verificaAlternativa() {
    const respostaSelecionada = respostasSelecionadas[props.pergunta];
    const alternativaAtual = transformaNumero(props.index);

    if (respostaSelecionada === alternativaAtual) {
      if (props.texto === props.alternativaCorreta && !pontuacaoAtualizada) { 
        const pontuacaoAtual = pontuacao;
        setPontuacao(pontuacaoAtual + 1);
        console.log(pontuacao)
        setPontuacaoAtualizada(true);
      }
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    setPontuacaoAtualizada(false); 
  }, [props.pergunta]);

  const verifica = verificaAlternativa();

  const alternativaCorretaTexto = props.alternativaCorreta;

  return (
    <>
      {verifica ? (
        props.texto === alternativaCorretaTexto ? (
          /* Botão caso seja a alternativa correta */
          <Button
          className={"border text-[#ffffff] bg-[#1aa426] flex gap-8 items-center"}
          key={props.index}
        >
          <div className='bg-[#f5f5f5] text-[#1aa426] rounded-full w-6 h-6 text-xs flex justify-center items-center border'>
            {alternativaLetra}
          </div>
          {props.texto}
        </Button>
        ):
        /* Botão caso seja a alternativa incorreta */
        (
          <Button
          className={"border text-[#ffffff] bg-[#ff5e5e] flex gap-8 items-center"}
          key={props.index}
        >
          <div className='bg-[#f5f5f5] text-[#ff5e5e] rounded-full w-6 h-6 text-xs flex justify-center items-center border'>
            {alternativaLetra}
          </div>
          {props.texto}
        </Button>
        )
       
      ) : 
      /* Botão caso não seja a alternativa selecionada */
      (
        <Button
          className={"border text-[#555555] bg-[#ffffff] flex gap-8 items-center"}
          key={props.index}
          disabled
        >
          <div className='bg-[#f5f5f5] rounded-full w-6 h-6 text-xs flex justify-center items-center border'>
            {alternativaLetra}
          </div>
          {props.texto}
        </Button>
      )}
      {verifica && props.texto !== alternativaCorretaTexto ? (
        <div className='bg-[#f5f5f5] text-[#555555] p-2 text-sm rounded-lg'> 
          Ops... não foi dessa vez, resposta correta era <strong className='font-bold text-[#124115]'>{alternativaCorretaTexto}</strong>
          </div>
      ) : null}
    </>
  );
}