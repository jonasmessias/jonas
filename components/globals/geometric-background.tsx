"use client"

export const GeometricBackground = () => {
  return (
    <div className="absolute top-[100vh] left-0 right-0 h-[300vh] pointer-events-none overflow-hidden opacity-[0.15] z-0">
      {/* Grid principal de linhas verticais */}
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
        <div className="absolute left-[20%] top-0 w-px h-full bg-gradient-to-b from-transparent via-primary via-50% to-transparent"></div>
        <div className="absolute left-[30%] top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
        <div className="absolute left-[40%] top-0 w-px h-full bg-gradient-to-b from-primary/50 via-primary to-primary/50"></div>
        <div className="absolute left-[50%] top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
        <div className="absolute left-[60%] top-0 w-px h-full bg-gradient-to-b from-primary/50 via-primary to-primary/50"></div>
        <div className="absolute left-[70%] top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
        <div className="absolute left-[80%] top-0 w-px h-full bg-gradient-to-b from-transparent via-primary via-50% to-transparent"></div>
        <div className="absolute left-[90%] top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
      </div>

      {/* Grid de linhas horizontais */}
      <div className="absolute inset-0">
        <div className="absolute top-[5%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute top-[10%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary via-50% to-transparent"></div>
        <div className="absolute top-[15%] left-0 h-px w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
        <div className="absolute top-[20%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary via-50% to-transparent"></div>
        <div className="absolute top-[25%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute top-[30%] left-0 h-px w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
        <div className="absolute top-[35%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary via-50% to-transparent"></div>
        <div className="absolute top-[40%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute top-[45%] left-0 h-px w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
        <div className="absolute top-[50%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary via-50% to-transparent"></div>
        <div className="absolute top-[55%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute top-[60%] left-0 h-px w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
        <div className="absolute top-[65%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary via-50% to-transparent"></div>
        <div className="absolute top-[70%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute top-[75%] left-0 h-px w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
        <div className="absolute top-[80%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary via-50% to-transparent"></div>
        <div className="absolute top-[85%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute top-[90%] left-0 h-px w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
        <div className="absolute top-[95%] left-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>

      {/* Elementos decorativos diagonais */}
      <div className="absolute inset-0">
        <div className="absolute top-[8%] left-[15%] w-32 h-32 border border-primary/20 rotate-45"></div>
        <div className="absolute top-[25%] right-[20%] w-24 h-24 border border-primary/20 rotate-12"></div>
        <div className="absolute top-[42%] left-[25%] w-20 h-20 border border-primary/20 -rotate-45"></div>
        <div className="absolute top-[18%] right-[10%] w-16 h-16 border border-primary/20 rotate-45"></div>
        <div className="absolute top-[55%] left-[10%] w-28 h-28 border border-primary/20 -rotate-12"></div>
        <div className="absolute top-[68%] right-[15%] w-22 h-22 border border-primary/20 rotate-45"></div>
        <div className="absolute top-[82%] left-[30%] w-18 h-18 border border-primary/20 rotate-12"></div>
      </div>

      {/* Pontos de intersecção */}
      <div className="absolute inset-0">
        <div className="absolute top-[5%] left-[40%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[10%] left-[60%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[15%] left-[20%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[20%] left-[80%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[25%] left-[50%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[30%] left-[30%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[35%] left-[70%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[40%] left-[10%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[45%] left-[90%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[50%] left-[45%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[55%] left-[25%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[60%] left-[65%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[65%] left-[15%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[70%] left-[85%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[75%] left-[55%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[80%] left-[35%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[85%] left-[75%] w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-[90%] left-[20%] w-2 h-2 bg-primary rounded-full"></div>
      </div>
    </div>
  )
}
