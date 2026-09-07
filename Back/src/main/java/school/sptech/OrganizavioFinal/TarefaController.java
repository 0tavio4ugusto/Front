package school.sptech.OrganizavioFinal;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    private final JdbcTemplate template;

    public TarefaController(JdbcTemplate template) {
        this.template = template;
    }

    @GetMapping
    public ResponseEntity<List<Tarefa>> listar() {
        String sql = "SELECT * FROM tarefa";
        List<Tarefa> result = template.query(sql, new BeanPropertyRowMapper<>(Tarefa.class));
        return ResponseEntity.status(200).body(result);
    }

    @PostMapping
    public ResponseEntity<Tarefa> cadastrar(@RequestBody Tarefa tarefa) {
        String sql = "INSERT INTO tarefa (titulo, descricao, prioridade, categoria, data) VALUES (?,?,?,?,?)";

        KeyHolder holder = new GeneratedKeyHolder();

        template.update(con -> {
            PreparedStatement statement = con.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            statement.setString(1, tarefa.getTitulo());
            statement.setString(2, tarefa.getDescricao());
            statement.setString(3, tarefa.getPrioridade());
            statement.setString(4, tarefa.getCategoria());
            statement.setString(5, tarefa.getData());
            return statement;
        }, holder);

        int idGerado = holder.getKey().intValue();
        tarefa.setId(idGerado);
        return ResponseEntity.status(200).body(tarefa);
    }
}