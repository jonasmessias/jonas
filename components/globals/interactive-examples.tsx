/**
 * EXEMPLOS DE USO DOS COMPONENTES DE LINHA INTERATIVA
 *
 * Este arquivo contém exemplos de como usar os componentes:
 * - Line (horizontal ou vertical)
 * - VerticalLine
 * - InteractiveBox
 */

import InteractiveBox from '@/components/globals/interactive-box'
import Line from '@/components/globals/line'
import VerticalLine from '@/components/globals/vertical-line'

// ============================================
// EXEMPLO 1: Linha Horizontal (padrão)
// ============================================
export function ExampleHorizontalLine() {
  return (
    <div className="w-full">
      <h2>Linha Horizontal</h2>
      <Line />
      <p>Passe o mouse sobre a linha acima!</p>
    </div>
  )
}

// ============================================
// EXEMPLO 2: Linha Vertical
// ============================================
export function ExampleVerticalLine() {
  return (
    <div className="flex gap-8 h-[400px]">
      <div className="flex-1">
        <h2>Linha Vertical (usando Line)</h2>
        <Line orientation="vertical" />
      </div>

      <div className="flex-1">
        <h2>Linha Vertical (usando VerticalLine)</h2>
        <VerticalLine />
      </div>
    </div>
  )
}

// ============================================
// EXEMPLO 3: InteractiveBox - Caixa Completa
// ============================================
export function ExampleInteractiveBox() {
  return (
    <InteractiveBox className="w-[600px] h-[400px] p-12">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Interactive Box</h1>
          <p className="text-lg">Passe o mouse sobre as bordas desta caixa!</p>
          <p className="text-sm text-gray-500 mt-2">
            Você pode interagir com as 4 linhas ao redor
          </p>
        </div>
      </div>
    </InteractiveBox>
  )
}

// ============================================
// EXEMPLO 4: InteractiveBox - Apenas Top e Bottom
// ============================================
export function ExampleInteractiveBoxTopBottom() {
  return (
    <InteractiveBox
      className="w-full h-[300px] p-8"
      showLeft={false}
      showRight={false}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold">Apenas Top e Bottom</h2>
        <p>Esta caixa tem apenas linhas em cima e embaixo</p>
      </div>
    </InteractiveBox>
  )
}

// ============================================
// EXEMPLO 5: InteractiveBox - Apenas Left e Right
// ============================================
export function ExampleInteractiveBoxLeftRight() {
  return (
    <InteractiveBox
      className="w-[400px] h-[500px] p-8"
      showTop={false}
      showBottom={false}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold">Apenas Left e Right</h2>
        <p>Esta caixa tem apenas linhas nas laterais</p>
      </div>
    </InteractiveBox>
  )
}

// ============================================
// EXEMPLO 6: InteractiveBox com Áudio Customizado
// ============================================
export function ExampleInteractiveBoxWithAudio() {
  return (
    <InteractiveBox
      className="w-[500px] h-[350px] p-10"
      audioSrc="/sounds/2-oct-c.wav"
      volume={0.7}
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Com Áudio Customizado</h2>
          <p className="text-sm">
            Esta caixa usa um som diferente quando você interage
          </p>
          <p className="text-xs text-gray-500 mt-2">
            audioSrc="/sounds/2-oct-c.wav" | volume={0.7}
          </p>
        </div>
      </div>
    </InteractiveBox>
  )
}

// ============================================
// EXEMPLO 7: Grid de Caixas Interativas
// ============================================
export function ExampleInteractiveGrid() {
  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <InteractiveBox className="h-[300px] p-6 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-xl font-bold">Box 1</h3>
        <p>Conteúdo da primeira caixa</p>
      </InteractiveBox>

      <InteractiveBox className="h-[300px] p-6 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-xl font-bold">Box 2</h3>
        <p>Conteúdo da segunda caixa</p>
      </InteractiveBox>

      <InteractiveBox className="h-[300px] p-6 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-xl font-bold">Box 3</h3>
        <p>Conteúdo da terceira caixa</p>
      </InteractiveBox>

      <InteractiveBox className="h-[300px] p-6 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-xl font-bold">Box 4</h3>
        <p>Conteúdo da quarta caixa</p>
      </InteractiveBox>
    </div>
  )
}

// ============================================
// EXEMPLO 8: Card com InteractiveBox
// ============================================
export function ExampleInteractiveCard() {
  return (
    <InteractiveBox className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Project Title</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Este é um card interativo com bordas animadas. Passe o mouse sobre as
          bordas para ver a animação de onda!
        </p>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
            React
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
            TypeScript
          </span>
        </div>
        <button className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Ver Projeto
        </button>
      </div>
    </InteractiveBox>
  )
}

// ============================================
// EXEMPLO 9: Seção Hero com Bordas Interativas
// ============================================
export function ExampleInteractiveHero() {
  return (
    <InteractiveBox className="min-h-screen flex items-center justify-center p-12">
      <div className="text-center space-y-6 max-w-4xl">
        <h1 className="text-6xl font-bold">Bem-vindo ao Meu Portfólio</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Desenvolvedor Full Stack especializado em criar experiências
          interativas
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Ver Projetos
          </button>
          <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Contato
          </button>
        </div>
      </div>
    </InteractiveBox>
  )
}
