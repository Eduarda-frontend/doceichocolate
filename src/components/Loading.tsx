import logo from '@/assets/logo.png'

const Loading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center space-y-8">

                {/* Logo / Brand */}
                <div className="relative">
                    <div className="w-36 h-36 mx-auto rounded-2xl flex items-center justify-center shadow-xl border border-pink-medium/30 animate-bg-flash">
                        <img
                            className="rounded-3xl max-w-[153px] lg:w-[153px] animate-pulse-logo"
                            src={logo}
                            alt="Logo Doce e Chocolate"
                        />
                    </div>
                </div>

                {/* Texto Carregando */}
                <div className="space-y-2">

                    <p className="text-muted-foreground/80 text-sm font-light">
                        Preparando suas delícias artesanais...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loading;
