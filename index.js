(() => {
  const household = [];

  const form = document.querySelector('form');
  const addButton = document.querySelector('.add');

  const ageField = document.querySelector('#age');
  const relationField = document.querySelector('#rel');
  const isSmokerField = document.querySelector('#smoker');

  const householdSummary = document.querySelector('.household');
  const debugSummary = document.querySelector('.debug');

  init();

  function init() {
    ageField.required = true;
    ageField.type = 'number';
    ageField.min = 1;
    relationField.required = true;
    form.noValidate = true;

    addButton.addEventListener('click', (e) => {
      e.preventDefault();
      addFamilyMember();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      debugSummary.innerText = JSON.stringify(household);
      debugSummary.style.display = 'block';
    });
    form.addEventListener('validate')
  }

  function addFamilyMember() {
    // Also lets the user know there's an error
    if (!form.reportValidity()) {
      return;
    }

    household.push({
      age: parseInt(ageField.value),
      relation: relationField.value,
      isSmoker: isSmokerField.checked,
    });
    form.reset();
    renderSummary();
  }

  function genFamilyMemberSummary(familyMember) {
    const summary = document.createElement('li');
    const smokerStatus = familyMember.isSmoker ? 'Smoker' : 'Non-smoker';
    summary.innerText =
        `${familyMember.relation} - ${familyMember.age} (${smokerStatus})`;

    const deleteButton = document.createElement('button');
    deleteButton.style.marginLeft = '4px';
    deleteButton.innerText = '-';
    deleteButton.addEventListener('click', () => {
      household.splice(
        household.indexOf(familyMember),
        1,
      );
      renderSummary();
    });
    summary.appendChild(deleteButton);

    return summary;
  }

  function renderSummary() {
    const householdNodes = household.map(genFamilyMemberSummary);
    householdSummary.replaceChildren(...householdNodes);
  }
})();
