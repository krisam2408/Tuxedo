using Microsoft.AspNetCore.Mvc;

namespace TuxedoASP.Controllers;

public class DocsController : BaseController
{
    public IActionResult Index()
    {
        return View();
    }
}
