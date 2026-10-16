export async function buscarProjetos() {
    
        try{
          const response = await fetch('./data/projects.json');
        
          if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
          }

          const projetos = await response.json();
          return Array.isArray(projetos) ? projetos : [];
        
        }catch(error){
            console.error("Erro ao buscar projetos no projects.json:", error);
            return[];
        }

}

export async function buscarProjetosPorId(id) {
    const projetos = await buscarProjetos();
    return projetos.find(projetos => projetos.id === id);
}