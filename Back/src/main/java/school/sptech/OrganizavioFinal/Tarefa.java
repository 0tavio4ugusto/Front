package school.sptech.OrganizavioFinal;

public class Tarefa {
    private Integer id;
    private String titulo;
    private String descricao;
    private String prioridade;
    private String categoria;
    private String data;

    public Tarefa() {}

    public Tarefa(Integer id, String titulo, String descricao, String prioridade, String categoria, String data) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.categoria = categoria;
        this.data = data;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getPrioridade() { return prioridade; }
    public void setPrioridade(String prioridade) { this.prioridade = prioridade; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }
}