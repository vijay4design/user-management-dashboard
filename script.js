document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("userTable");
  const searchInput = document.getElementById("searchInput");

  let allUsers = [];

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(users => {
      allUsers = users;
      renderUsers(allUsers);
    });

  function renderUsers(users) {
    table.innerHTML = "";

    users.forEach(user => {
      const row = document.createElement("tr");
      row.className = "border-b hover:bg-gray-50";

      row.innerHTML = `
        <td class="p-4 flex gap-3 items-center">
          <div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
            ${user.name.charAt(0)}
          </div>
          <div>
            <p class="font-medium">${user.name}</p>
            <p class="text-sm text-gray-400">${user.email}</p>
          </div>
        </td>
        <td class="p-4">${user.username}</td>
        <td class="p-4">${user.company.name}</td>
        <td class="p-4 text-green-500">In Work</td>
        <td class="p-4">Frontend</td>
      `;

      table.appendChild(row);
    });
  }

  // Search logic
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allUsers.filter(user =>
      user.name.toLowerCase().includes(value) ||
      user.username.toLowerCase().includes(value)
    );

    renderUsers(filtered);
  });
});
