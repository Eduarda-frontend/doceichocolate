import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface CakeConfigCardProps {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

const formatLabel = (text: string) => {
    const clean = text.replace("_", " ");
    return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const CakeConfigCard = ({ register, errors }: CakeConfigCardProps) => {
    const [massasExtras, setMassasExtras] = useState<string[]>([]);
    const [recheiosExtras, setRecheiosExtras] = useState<string[]>([]);
    const [decoracoesExtras, setDecoracoesExtras] = useState<string[]>([]);
    const [decExtraExtras, setDecExtraExtras] = useState<string[]>([]);

    const [newMassa, setNewMassa] = useState("");
    const [newRecheio, setNewRecheio] = useState("");
    const [newDec, setNewDec] = useState("");
    const [newDecExtra, setNewDecExtra] = useState("");

    // Listas padrão sempre ordenadas
    const massasPadrao = ["baunilha", "chocolate", "red_velvet"];
    const recheiosPadrao = ["beijinho", "brigadeiro", "doce_de_leite"];
    const decoracoesPadrao = [
        "Apenas frase / escrita",
        "Frase + desenho",
        "Apenas desenho",
    ];
    const decoracoesExtrasPadrao = [
        "borboletas",
        "cereja",
        "coroa",
        "globos de luz",
        "laços",
        "papel de arroz",
        "tiara",
    ];

    const renderLabelWithX = (item: string, fieldName: string) => (
        <label
            key={item}
            className="flex items-center justify-between gap-2 p-2 border rounded-lg hover:bg-secondary transition cursor-pointer text-sm relative group"
        >
            <div className="flex items-center gap-2">
                <input type="checkbox" value={item} {...register(fieldName)} />
                {formatLabel(item)}
            </div>

            <button
                type="button"
                onClick={() => console.log(`Excluindo ${item} (simulado)`)}
                className="text-pink-500 text-sm font-bold ml-2 opacity-0 group-hover:opacity-100 transition-colors"
            >
                x
            </button>
        </label>
    );

    return (
        <div className="p-6 rounded-xl border bg-card shadow-sm">
            <h2 className="font-semibold text-lg mb-6">Configurações do Bolo</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* MASSAS */}
                <div className="space-y-2">
                    <label className="font-semibold text-sm">Tipos de Massa*</label>

                    <div className="grid gap-2">
                        {[...massasPadrao, ...massasExtras]
                            .sort((a, b) => a.localeCompare(b))
                            .map((massa) => renderLabelWithX(massa, "massa"))}
                    </div>

                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={newMassa}
                            onChange={(e) => setNewMassa(e.target.value)}
                            placeholder="Adicionar outro tipo..."
                            className="border rounded-lg p-2 text-sm w-full"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (newMassa.trim()) {
                                    setMassasExtras((prev) => [...prev, newMassa.toLowerCase()]);
                                    setNewMassa("");
                                }
                            }}
                            className="px-3 py-1 border rounded-lg text-sm bg-secondary hover:bg-secondary/70"
                        >
                            +
                        </button>
                    </div>

                    {errors.massa && (
                        <p className="text-sm text-red-500">{errors.massa.message as string}</p>
                    )}
                </div>

                {/* RECHEIOS */}
                <div className="space-y-2">
                    <label className="font-semibold text-sm">Recheios*</label>

                    <div className="grid gap-2">
                        {[...recheiosPadrao, ...recheiosExtras]
                            .sort((a, b) => a.localeCompare(b))
                            .map((rec) => renderLabelWithX(rec, "recheio"))}
                    </div>

                    <div className="flex gap-2 mt-2">
                        <input
                            value={newRecheio}
                            onChange={(e) => setNewRecheio(e.target.value)}
                            placeholder="Adicionar outro tipo..."
                            className="border rounded-lg p-2 text-sm w-full"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (newRecheio.trim()) {
                                    setRecheiosExtras((prev) => [...prev, newRecheio.toLowerCase()]);
                                    setNewRecheio("");
                                }
                            }}
                            className="px-3 py-1 border rounded-lg text-sm bg-secondary hover:bg-secondary/70"
                        >
                            +
                        </button>
                    </div>

                    {errors.recheio && (
                        <p className="text-sm text-red-500">{errors.recheio.message as string}</p>
                    )}
                </div>

                {/* DECORAÇÃO */}
                <div className="space-y-2">
                    <label className="font-semibold text-sm">Decoração*</label>

                    <div className="grid gap-2">
                        {[...decoracoesPadrao, ...decoracoesExtras]
                            .sort((a, b) => a.localeCompare(b))
                            .map((decor) => renderLabelWithX(decor, "decoracao"))}
                    </div>

                    <div className="flex gap-2 mt-2">
                        <input
                            value={newDec}
                            onChange={(e) => setNewDec(e.target.value)}
                            placeholder="Adicionar outra decoração..."
                            className="border rounded-lg p-2 text-sm w-full"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (newDec.trim()) {
                                    setDecoracoesExtras((prev) => [...prev, newDec]);
                                    setNewDec("");
                                }
                            }}
                            className="px-3 py-1 border rounded-lg text-sm bg-secondary hover:bg-secondary/70"
                        >
                            +
                        </button>
                    </div>

                    {errors.decoracao && (
                        <p className="text-sm text-red-500">{errors.decoracao.message as string}</p>
                    )}
                </div>

                {/* DECORAÇÃO EXTRA */}
                <div className="space-y-2">
                    <label className="font-semibold text-sm">
                        Esse produto possui quais decorações extras?*
                    </label>

                    <div className="grid gap-2">
                        {[...decoracoesExtrasPadrao, ...decExtraExtras]
                            .sort((a, b) => a.localeCompare(b))
                            .map((item) => renderLabelWithX(item, "decoracao_extra"))}
                    </div>

                    <div className="flex gap-2 mt-2">
                        <input
                            value={newDecExtra}
                            onChange={(e) => setNewDecExtra(e.target.value)}
                            placeholder="Adicionar outra opção..."
                            className="border rounded-lg p-2 text-sm w-full"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (newDecExtra.trim()) {
                                    setDecExtraExtras((prev) => [...prev, newDecExtra.toLowerCase()]);
                                    setNewDecExtra("");
                                }
                            }}
                            className="px-3 py-1 border rounded-lg text-sm bg-secondary hover:bg-secondary/70"
                        >
                            +
                        </button>
                    </div>

                    {errors.decoracao_extra && (
                        <p className="text-sm text-red-500">
                            {errors.decoracao_extra.message as string}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CakeConfigCard;
