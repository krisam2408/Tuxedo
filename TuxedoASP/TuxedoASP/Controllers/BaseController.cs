using Microsoft.AspNetCore.Mvc;

namespace TuxedoASP.Controllers;

public abstract class BaseController : Controller
{
    public const string BaseLayout = "/Views/Shared/Layouts/_BaseLayout.cshtml";
    public const string DocsLayout = "/Views/Shared/Layouts/_DocsLayout.cshtml";
}
