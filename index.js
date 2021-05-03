const projectsDsc = document.querySelectorAll('.prDescription');
const prAngular = document.querySelector('.box-angular');
const prOwn = document.querySelector('.box-own');
const prFcc = document.querySelector('.box-fcc');
const projects = [prAngular, prOwn, prFcc];


projectsDsc.forEach(projectDesc => {
    projectDesc.addEventListener('mouseover', (event) => {
        const id = event.path[0].id;
        const target = id.replace('prDescription-', '');
        document.getElementById(id).classList.add('highlight-projects-description');
        document.querySelector(`.box-${target}`).classList.add('highlight-projects');
    });

    projectDesc.addEventListener('mouseout', () =>{
            projects.forEach( project => project.classList.remove('highlight-projects'))
            document.querySelectorAll('.prDescription').forEach(el => el.classList.remove('highlight-projects-description'));
    });
})
