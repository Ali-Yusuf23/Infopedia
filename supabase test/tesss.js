const supabaseee = window.supabase.createClient(
    "https://pxjyevpfzrafqnrcdzdd.supabase.co",
    "sb_publishable_Fbv2DZ-ykT6lpOHSK-mvGw_Cb4covMk"
);

const formeee = document.querySelector('#tesForm');
formeee.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usern = document.querySelector('#usn').value;
    const { data, error } = await supabaseee
        .from('tes')
        .insert([{ usn: usern }]);
    console.log(data);
    console.log(error);
});

async function getUsers() {
    const { data, error } = await supabaseee
        .from('tes')
        .select('*');
    console.log(data);
    console.log(error);
    const container = document.querySelector("#comments");
}
getUsers();