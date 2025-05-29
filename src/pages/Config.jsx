import { useState } from "react";
import { supabase } from "../../SupabaseClient";

export const config = () => {
    const [imagem, setImagem] = useState(null);
    const [preview, setpreview]= useState(null);}