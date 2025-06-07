document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let score = 0;

    const answers = {
        q1: 'b',
        q2: 'a',
        q3: 'a'
    };

    for (let key in answers) {
        const selected = document.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === answers[key]) {
            score++;
        }
    }

    document.getElementById('result').textContent = `Правильних відповідей: ${score} з ${Object.keys(answers).length}`;
});
