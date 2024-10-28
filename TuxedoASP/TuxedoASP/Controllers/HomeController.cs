using Microsoft.AspNetCore.Mvc;

namespace TuxedoASP.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
