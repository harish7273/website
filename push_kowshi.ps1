Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
using System.Text;

public class CredentialHelper {
    [DllImport("advapi32.dll", EntryPoint = "CredReadW", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern bool CredRead(string target, int type, int reservedFlag, out IntPtr credentialPtr);

    [DllImport("advapi32.dll", EntryPoint = "CredFree", SetLastError = true)]
    public static extern void CredFree(IntPtr credentialPtr);

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct CREDENTIAL {
        public int Flags;
        public int Type;
        public string TargetName;
        public string Comment;
        public long LastWritten;
        public int CredentialBlobSize;
        public IntPtr CredentialBlob;
        public int Persist;
        public int AttributeCount;
        public IntPtr Attributes;
        public string TargetAlias;
        public string UserName;
    }

    public static string GetCredential(string target) {
        IntPtr credPtr;
        if (CredRead(target, 1, 0, out credPtr)) {
            var cred = (CREDENTIAL)Marshal.PtrToStructure(credPtr, typeof(CREDENTIAL));
            byte[] blob = new byte[cred.CredentialBlobSize];
            Marshal.Copy(cred.CredentialBlob, blob, 0, cred.CredentialBlobSize);
            CredFree(credPtr);
            return Encoding.Unicode.GetString(blob);
        }
        return null;
    }
}
'@

$pass = [CredentialHelper]::GetCredential("git:https://github.com")
if (!$pass) {
    Write-Error "Could not retrieve credential"
    exit 1
}

$remoteUrl = "https://harish7273:$($pass)@github.com/harish7273/website.git"

Write-Output "Adding files and committing..."
git add .
git commit -m "Transform website into Kawaii Cow Bento-grid birthday experience for Kowshi (19th Birthday on Nov 26)"
Write-Output "Pushing to GitHub..."
git push $remoteUrl main
if ($LASTEXITCODE -eq 0) {
    Write-Output "SUCCESSFULLY_DEPLOYED_KOWSHI_TO_GITHUB"
} else {
    Write-Error "Failed to push"
}
