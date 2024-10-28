using TuxedoASP.Models;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

ConfigureServices();

WebApplication app = builder.Build();

if(!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.MapControllerRoute
(
    name:"default",
    pattern:"{controller=home}/{action=index}/{id?}"
);

app.Run();

void ConfigureServices()
{
    AppSettings.Initialize(builder.Configuration);

    builder.Services.AddControllersWithViews();
}